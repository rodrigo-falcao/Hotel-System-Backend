import { AuthGuard } from "src/shared/guards/auth.guard";
import { 
    BadRequestException, 
    Body, 
    Controller, 
    Delete, 
    Get, 
    MaxFileSizeValidator, 
    ParseFilePipe, 
    Patch, 
    Post, 
    UploadedFile, 
    UseGuards, 
    UseInterceptors 
} from "@nestjs/common";
import { CreateUserDTO } from "./domain/dto/createUser.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileValidationInterceptor } from "src/shared/interceptors/filevalidation.interceptor";
import { ParamId } from "src/shared/decorators/paramId.decorator";
import { Role, User as UserType } from "@prisma/client";
import { RoleGuard } from "src/shared/guards/role.guard";
import { Roles } from "src/shared/decorators/roles.decorator";
import { ThrottlerGuard } from "@nestjs/throttler";
import { UpdateUserDTO } from "./domain/dto/updateUser.dto";
import { User } from "src/shared/decorators/user.decorator";
import { UserMathGuard } from "src/shared/guards/user.guard";
import { UserService } from "./user.service";

@UseGuards(AuthGuard, RoleGuard, ThrottlerGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    list(@User() user: UserType) {
        console.log(user);
        return this.userService.list();
    }

    @Get(':id')
    show(@ParamId() id: number) {
        return this.userService.show(id);
    }

    @Roles(Role.ADMIN, Role.USER)
    @Post()
    createUser(@Body() body: CreateUserDTO) {
        return this.userService.createUser(body);
    }

    @UseGuards(UserMathGuard)
    @Patch(':id')
    updateUser(@ParamId() id: number, @Body() body: UpdateUserDTO) {
        return this.userService.updateUser(id, body);
    }

    @UseGuards(UserMathGuard)
    @Delete(':id')
    deleteUser(@ParamId() id: number) {
        return this.userService.deleteUser(id);
    }

    @UseInterceptors(FileInterceptor('avatar'), FileValidationInterceptor)
    @Post('avatar')
    uploadAvatar(
        @User('id') id: number, 
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
                ]
            })
        ) avatar: Express.Multer.File
    ) {
        if (!avatar) {
            throw new BadRequestException('Arquivo não enviado!');
        }
        if (!avatar.mimetype.startsWith('image/')) {
            throw new BadRequestException('O arquivo enviado não é uma imagem!');
        }
        return this.userService.uploadAvatar(id, avatar.filename);
    }
}