import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public content: string;

  public user_id: number;
}

export class commentOnPostDto {
  @IsString()
  @IsNotEmpty()
  public comment: string;

  @IsNumber()
  @IsNotEmpty()
  public post_id: number;

  @IsNumber()
  @IsNotEmpty()
  public user_id: number;
}