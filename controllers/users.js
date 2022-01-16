import { v4 as uuidv4 } from 'uuid';
import Users from '../models/users.js'


export const getUsers = async (req, res) => {
    try {
        const getU = await Users.find();
                
        res.status(200).json(getU);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {

    const { firstName, lastName, password, age } = req.body;

    const newUser = new Users({ firstName, lastName, password, age, id: uuidv4()})

    try {
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const u = await Users.findById(id);
        
        res.status(200).json(u);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
  }

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    await Users.findByIdAndRemove(id);

    res.json({ message: "User deleted successfully." });
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, password, age } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = { firstName, lastName, password, age , _id: id };

    await Users.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updatedUser)

}
