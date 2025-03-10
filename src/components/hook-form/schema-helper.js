import dayjs from 'dayjs';
import { z as zod } from 'zod';

// ----------------------------------------------------------------------

export const schemaHelper = {
  /**
   * Phone number
   * defaultValue === ''
   */
  phoneNumber: (props) =>
    zod
      .string({
        required_error: props?.message?.required_error ?? 'Phone number is required!',
        invalid_type_error: props?.message?.invalid_type_error ?? 'Invalid phone number!',
      })
      .min(1, {
        message: props?.message?.required_error ?? 'Phone number is required!',
      })
      .refine((data) => props?.isValidPhoneNumber?.(data), {
        message: props?.message?.invalid_type_error ?? 'Invalid phone number!',
      }),
  
  /**
   * Date
   * defaultValue === null
   */
  date: (props) =>
    zod.coerce
      .date()
      .nullable()
      .transform((dateString, ctx) => {
        const date = dayjs(dateString).format();

        const stringToDate = zod.string().pipe(zod.coerce.date());

        if (!dateString) {
          ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            message: props?.message?.required_error ?? 'Date is required!',
          });
          return null;
        }

        if (!stringToDate.safeParse(date).success) {
          ctx.addIssue({
            code: zod.ZodIssueCode.invalid_date,
            message: props?.message?.invalid_type_error ?? 'Invalid Date!!',
          });
        }

        return date;
      })
      .pipe(zod.union([zod.number(), zod.string(), zod.date(), zod.null()])),
  
  /**
   * Editor
   * defaultValue === '' | <p></p>
   */
  editor: (props) =>
    zod.string().min(8, {
      message: props?.message?.required_error ?? 'Editor is required!',
    }),

  /**
   * Object
   * defaultValue === null
   */
  objectOrNull: (props) =>
    zod.custom().refine((data) => data !== null && data !== '', {
      message: props?.message?.required_error ?? 'Field is required!',
    }),

  /**
   * Boolean
   * defaultValue === false
   */
  boolean: (props) =>
    zod.coerce.boolean().refine((bool) => bool === true, {
      message: props?.message?.required_error ?? 'Switch is required!',
    }),

  /**
   * File
   * defaultValue === '' || null
   */
  file: (props) =>
    zod.custom().transform((data, ctx) => {
      const hasFile = data instanceof File || (typeof data === 'string' && !!data.length);

      if (!hasFile) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: props?.message?.required_error ?? 'File is required!',
        });
        return null;
      }

      return data;
    }),

  /**
   * Files
   * defaultValue === []
   */
  files: (props) =>
    zod
      .array(zod.custom())
      .transform((data, ctx) => {
        const minFiles = props?.minFiles ?? 1;
  
        if (!data.length) {
          ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            message: props?.message?.required_error ?? 'Files is required!',
          });
        } else if (data.length < minFiles) {
          ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            message: `Must have at least ${minFiles} items!`,
          });
        }
  
        // Check for duplicates based on name and type
        const uniqueFiles = [];
        const duplicates = [];
  
        data.forEach((newFile, index) => {
          // Check if the file already exists in uniqueFiles based on name and type
          const isDuplicate = uniqueFiles.some(
            (existingFile) => existingFile.name === newFile.name && existingFile.type === newFile.type
          );
          
          if (isDuplicate) {
            duplicates.push(newFile);
          } else {
            uniqueFiles.push(newFile);
          }
        });
  
        // If there are any duplicates, show an error and prevent the files from being added
        if (duplicates.length > 0) {
          ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            message: props?.message?.duplicate_error ?? 'This document is already added!',
          });
          // Return the unique files only (excluding duplicates)
          return uniqueFiles;
        }
  
        return data; // Return all files if no duplicates are found
      }),
    };  