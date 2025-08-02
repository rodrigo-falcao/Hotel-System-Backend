import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";
import { FindOneHotelsService } from "src/modules/hotels/services/findOneHotel.service";
import { Request } from "express";

interface AuthenticatedRequest extends Request {
    user?: any; 
    id?: number;  
}

@Injectable()
export class OwnerHotelGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly hotelService: FindOneHotelsService
    ) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const hotelId = request.params.id;
        const user = request.user as { id?: number };

        if (!user || !user.id) return false;

        const hotel = await this.hotelService.findOne(Number(hotelId));
        
        if (!hotel) return false;

        return hotel.ownerId === user.id;
    }
}