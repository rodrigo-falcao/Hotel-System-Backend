import { AuthModule } from "../auth/auth.module";
import { diskStorage } from "multer";
import { forwardRef, Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { PrismaModule } from "../prisma/prisma.module";
import { UserController } from "./user.controllers";
import { UserService } from "./user.service";
import { v4 as uuidv4 } from 'uuid';

@Module({
    imports: [
        PrismaModule, 
        forwardRef(() => AuthModule), 
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const fileName = `${uuidv4()}${file.originalname}`;
                    return cb(null, fileName);
                }
            }),
        })
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}