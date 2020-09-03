import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sequence } from './sequence.schema';

/**
 * Service that controls the creation, incrementation, and retrieval of
 * sequence values. These sequences are intended to be used to keep track
 * of basic system IDs for business entities.
 * 
 * If a sequence does not exist in the DB, it will be created upon the 
 * first request of its value or incrementation.
 */
@Injectable()
export class SequenceService {
  constructor(@InjectModel(Sequence.name) private sequenceModel: Model<Sequence>) { }

  /**
   * Returns the current value of the sequence.
   * 
   * @param sequenceName The name of the sequence to return value of
   * @returns number
   */
  getCurrent = async (sequenceName: string): Promise<number> => {
    if (!(await this.seqExists(sequenceName)))
      await this.createNewSeq(sequenceName);

    const seq: Sequence = await this.sequenceModel.findOne({ name: sequenceName }).exec();
    return seq.seq;
  }

  /**
   * ! THIS METHOD MUTATES THE SEQUENCE, USE WITH CAUTION !
   * 
   * Call to increment the given sequence, does not return a value.
   * 
   * @param sequenceName The name of the sequence to increment
   * @returns void
   */
  next = async (sequenceName: string): Promise<Sequence> => {
    if (!(await this.seqExists(sequenceName)))
      await this.createNewSeq(sequenceName);
    return this.sequenceModel.findOneAndUpdate({ name: sequenceName }, { $inc: { seq: 1 } }).exec();
  }

  /**
   * ! THIS METHOD MUTATES THE SEQUENCE, USE WITH CAUTION !
   * 
   * Call to return the next number in a given sequence. This will update 
   * the current sequence number set in the database.
   * 
   * @param sequenceName The name of the sequence to increment & return value of
   * @returns number
   */
  getNext = async (sequenceName: string): Promise<number> => {
    if (!(await this.seqExists(sequenceName)))
      await this.createNewSeq(sequenceName);

    const s: Sequence = await this.sequenceModel.findOneAndUpdate({ name: sequenceName }, { $inc: { seq: 1 } }).exec();
    return s.seq;
  }

  /**
   * Determines if the given sequence exists in the DB.
   * 
   * @param sequenceName 
   */
  private seqExists = async (sequenceName: string): Promise<boolean> => {
    const doc = await this.sequenceModel.findOne({ name: sequenceName }).exec();
    return ![null, undefined].includes(doc);
  }

  /**
   * Creates a new sequence.
   * 
   * @param sequenceName The name of the new sequence to create
   * @returns void
   */
  private createNewSeq = async (sequenceName: string): Promise<Sequence> => {
    const newSeq = new this.sequenceModel({ name: sequenceName });
    return newSeq.save();
  }
}