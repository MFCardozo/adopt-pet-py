import { AWSS3Uploader } from "./aws/S3";

//Coun\t find other option that just harcoding credentials :(

export const s3Uploader = new AWSS3Uploader({
  accessKeyId: "AKIAVRCD4A3BCZ6BMK57",
  secretAccessKey: "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",
  destinationBucketName: "petfinderbucker",
});
