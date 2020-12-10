const User = require("../models/users");
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/AppTesting';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User Upload Testing', () => {
    var id = '';
    it('Add User', ()=>{
        const user = {
            'fullName':'sushant maharjan',
            'address':'lalitpur',
            'username':'sushant789',
            'gender':'male',
            'password':'123456',
            'image':'picture.jpg'
        };
        return User.create(user)
        .then((user_res)=>{
            id=user_res._id;
            expect(user_res.username).toEqual('sushant789');

        });
    })

    // Update User

    it('Updateuser Testing', () => {
        const updateUser = {
            username: 'maharjan155'
        }
        console.log(id)
        return User.findByIdAndUpdate(id, updateUser, {
            new: true
        }).then((updateUser) => {
            expect(updateUser.username).toEqual('maharjan155');
        });
    });

    //user delete

    it('User delete testing', async ()=>{
        const status = await
        User.deleteMany({
            username: 'sushant789'
        });
        expect(status.ok).toBe(1);
    })

})