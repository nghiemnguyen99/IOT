import { IsString, IsEmail } from "class-validator";

class CreateStoreDto {
  @IsString()
  public sdt: string;

  @IsString()
  public diachi: string;
  @IsEmail()
  public email: string;
  @IsString()
  public password: string;
  @IsString()
  public longitude: string;
  public latitude: string;
  public avatar: string;
  public timservice: string;
  public name: string;

  public id: number;
}

export default CreateStoreDto;
