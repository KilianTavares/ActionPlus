import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';

@Injectable()
export class ProfileService {
  async getUserProfile(userId: string) {
    const profile = await this.findUserProfile(userId);
    return profile;
  }

  async updateUserProfile(userId: string, profileCategory: string) {
    const updatedProfile = await this.updateUserProfileInDb(
      userId,
      profileCategory,
    );
    return updatedProfile;
  }

  private async findUserProfile(userId: string) {
    return null;
  }

  private async updateUserProfileInDb(userId: string, profileCategory: string) {
    return null;
  }
}
