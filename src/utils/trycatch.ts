import { HttpException, InternalServerErrorException } from '@nestjs/common';

// wrapper function for error handling.
export const trycatch =async (fn) => {
  try {
   return   await fn();
  } catch (error) {
    throw error;
    return error;


  }
};
