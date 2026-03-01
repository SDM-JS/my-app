// src/logger/db.transport.ts
import Transport from 'winston-transport';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface LogInfo {
  level: string;
  message: string;
  timestamp: string;
  [key: string]: any;
}

export class PrismaTransport extends Transport {
  constructor(opts?: any) {
    super(opts);
  }

  async log(info: LogInfo, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    try {
      // Extract the main fields
      const { level, message, timestamp, ...meta } = info;
      
      // Extract special fields from meta
      const {
        userId,
        userRole,
        entity,
        entityId,
        action,
        ip,
        userAgent,
        ...restMeta
      } = meta;

      // Store in database
      await prisma.log.create({
        data: {
          level,
          message,
          timestamp: new Date(timestamp),
          userId,
          userRole,
          entity,
          entityId,
          action,
          ip,
          userAgent,
          meta: Object.keys(restMeta).length > 0 ? restMeta : undefined,
        },
      });
    } catch (error) {
      console.error('Failed to write log to database:', error);
    }

    callback();
  }
}