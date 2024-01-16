import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	birth_year: number;
}

const userSchema = new Schema({
	name: String,
	email: String,
	password: String,
	confirmPassword: String,
	birth_year: Number,
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
