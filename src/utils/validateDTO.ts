export async function validateDTO<T>(dtoClass: new (data: any) => T, data: any): Promise<T> {
    try {
      return new dtoClass(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`DTO validation failed: ${error.message}`);
      }
      throw new Error('DTO validation failed: Unknown error');
    }
  }