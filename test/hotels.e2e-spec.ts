import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Role } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { CreateHotelDto } from 'src/modules/hotels/domain/dto/create-hotel.dto';
import { UpdateHotelDto } from 'src/modules/hotels/domain/dto/update-hotel.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let adminToken: string;
  let userToken: string;
  let hotelId: number;
  let adminUser: any;  
  let normalUser: any;  

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get(PrismaService);

    await prisma.hotel.deleteMany({});
    await prisma.user.deleteMany({
      where: {
        email: { in: ['admin@example.com', 'normal@example.com'] }
      }
    });

    adminUser = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'ADMIN',
      }
    });

    normalUser = await prisma.user.create({
      data: {
        name: 'Normal User',
        email: 'normal@example.com',
        password: 'normal123',
        role: 'USER',
      }
    });

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    adminToken = jwt.sign(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      {sub: adminUser.id, role: Role.ADMIN },
      process.env.JWT_SECRET,
      { expiresIn: '1h', issuer: 'dnc_hotel', audience: 'users' }
    );

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    userToken = jwt.sign(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      {sub: normalUser.id, role: Role.USER },
      process.env.JWT_SECRET,
      { expiresIn: '1h', issuer: 'dnc_hotel', audience: 'users' }
    );  
  });

  afterAll(async () => {
    await prisma.hotel.deleteMany({});
    await prisma.user.deleteMany({});
    await app.close();
  });


  it('/hotels (POST)', async () => {
    const createHotelDto: CreateHotelDto = {
        name: 'Hotel Test',
        description: 'Hotel para testes',
        price: 100,
        image: 'image-test.jpg',
        address: 'Rua Teste, 123',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ownerId: adminUser.id
      };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const response = await request(app.getHttpServer())
        .post('/hotels')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(createHotelDto)
        .expect(201);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      hotelId = response.body.id;

      expect(response.body).toMatchObject({
        name: createHotelDto.name,
        description: createHotelDto.description,
        price: createHotelDto.price,
        image: createHotelDto.image,
        address: createHotelDto.address,
        ownerId: createHotelDto.ownerId
      });
  });


  it('/hotels (GET)', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer())
    .get('/hotels')
    .set('Authorization', `Bearer ${userToken}`)
    .expect(200);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.data).toBeInstanceOf(Array);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.data).toHaveLength(1);
  });


  it('/hotels/:id (GET)', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer())
      .get(`/hotels/${hotelId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(response.body).toMatchObject({
      id: hotelId,
      name: 'Hotel Test',
    });
  });


  it('/hotels/:id (PATCH)', async () => {
    const updateHotelDto: UpdateHotelDto = {
      name: 'Updated Hotel Test',
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer())
      .patch(`/hotels/${hotelId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(updateHotelDto)
      .expect(200);

    expect(response.body).toMatchObject({
      name: updateHotelDto.name,
    });
  });


  it('/hotels/image/:id (PATCH)', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await request(app.getHttpServer())
      .patch(`/hotels/image/${hotelId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .attach('image', Buffer.from('test-image-content'), 'test-image.jpg')
      .expect(200);
  });


  it('/hotels/:id (DELETE)', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await request(app.getHttpServer())
      .delete(`/hotels/${hotelId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
  });
});
