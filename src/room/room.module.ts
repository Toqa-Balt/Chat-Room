import { Module } from "@nestjs/common";
import { GroupModule } from "../group/group.module.js";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ChatGateWay } from "./room.gateway.js";
import { JwtStrategy } from "../auth/jwt.strategy.js";

@Module({
    imports: [
        GroupModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1d' },
            }), 
        })
    ],
    providers: [ChatGateWay , JwtStrategy]

})
export class RoomModule { }