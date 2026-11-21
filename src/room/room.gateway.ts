import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GroupService } from '../group/group.service.js' ;
import { CreateGroupDto } from '../group/dto/create-group.dto.js';
import { JwtService } from '@nestjs/jwt';


@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateWay implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private readonly jwt: JwtService,
        private readonly groupService: GroupService
    ) { }

    @WebSocketServer()
    server: Server

    async handleConnection(client: Socket) {
        try {
            const token = client.handshake.headers?.token || client.handshake.auth?.token;;
            const payload = await this.jwt.verifyAsync(token);
            client.data.user = payload ;
            console.log(`user ${payload.id} connected successfully`);
        } catch {
            client.disconnect()
        }

    }
    handleDisconnect(client: Socket) {
        const user = client.data.user ;
        const groupId = client.data.groupId ;

        if(user && groupId){
            const group_key = `group:${groupId}`
            this.server.to(group_key).emit('user-left' , `${client.data.user.name} left the room`) ;
        }

        console.log('User disconnected:', client.id);

    }

    @SubscribeMessage('join-group')
    async joinGroup(@ConnectedSocket() client : Socket , @MessageBody() body : CreateGroupDto){
        const result = await this.groupService.findOrcreate(body.name);

        const group_key = `group:${result.group.id}` ;

        client.join(group_key) ;
        this.server.to(group_key).emit('user-entered' , `${client.data.user.name} enterd the room`) ;

        client.data.groupId = result.group.id 

        return result ;
    }

    @SubscribeMessage('newMessage')
    async newMessage(@ConnectedSocket() client : Socket ,
     @MessageBody() body : {groupId : number , content : string}){
        const userId = client.data.user.id ;
        const message = await this.groupService.newMessage(body.groupId , body.content , userId) ;
        const group_key =  `group:${body.groupId}` ;
        this.server.to(group_key).emit('new-message' , message) ;
    }

}