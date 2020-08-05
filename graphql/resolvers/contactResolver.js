import Contact from '../../models/contactModel';
import { contactSchema } from '../schemas';
import { UserInputError } from 'apollo-server-express';
import errorParse from '../../utils/errorParse';
import axios from 'axios';

export default {
    Mutation: {
        createContact: async (_, args) => {
            try {
                let errors = {};

                try {
                    await contactSchema.validate(args, { abortEarly: false });
                } catch (error) {
                    errors = errorParse(error);
                    throw new UserInputError('CREATE CONTACT ERROR - VALIDATE', { errors });
                }

                const { name, email, message, recaptcha } = args;

                // check recapcha
                const secret = process.env.RECAPTCHA_SECRET;

                const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptcha}`;

                const checkRecaptcha = await axios.post(url);

                if (checkRecaptcha.data.success === false) {
                    errors.recaptcha = 'Recaptcha timeout or duplicate. Please try again.';
                    throw new UserInputError('CONTACT RECAPTCHA ERROR', { errors });
                }

                const newContact = new Contact({
                    name,
                    email,
                    message,
                });

                await newContact.save();

                return 'create contact success';
            } catch (error) {
                return error;
            }
        },
    },
};
