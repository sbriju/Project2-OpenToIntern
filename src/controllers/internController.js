const collegeModel = require('../models/collegeModel');
const internModel = require('../models/interModel');
const { isValidBody, isValidFullName, isValidEmail, isValidMobile } = require('../util/validator');

//createInterns
const createInterns = async (req, res) => {
    try {
        let reqBody = req.body;
        const { name, email, mobile, collegeName } = reqBody;
        
        if (!isValidBody(reqBody)) return res.status(400).send({ status: false, message: 'Please enter data.' });
        if (!name) return res.status(400).send({ status: false, message: 'name is required.' });
        if (!email) return res.status(400).send({ status: false, message: 'email is required.' });
        if (!mobile) return res.status(400).send({ status: false, message: 'mobile is required..' });
        if (!collegeName) return res.status(400).send({ status: false, message: 'collegeName is required.' });

        if (!isValidFullName(name)) return res.status(400).send({ status: false, messege: `'${name}' this name isn't valid.` });
        if (!isValidEmail(email)) return res.status(400).send({ status: false, message: `'${email}' this email isn't valid.` });
        if (!isValidMobile(mobile)) return res.status(400).send({ status: false, message: `'${mobile}' this mobile isn't valid.` });
        if (!isValidFullName(collegeName)) return res.status(400).send({ status: false, message: `'${collegeName}' this college name isn't valid.` });

        //exitsCollegeName
        const exitsCollegeName = await collegeModel.findOne({ $or: [{ fullName: collegeName }, { name: collegeName }], isDeleted: false });
        if (!exitsCollegeName) return res.status(404).send({ status: false, message: `'${collegeName}' this college does't exists.` });

        //existsEmail & existNumber
        const existsEmail = await internModel.findOne({ email });
        if (existsEmail) return res.status(400).send({ status: false, message: `'${email}' this email already exists.` });
        const existNumber = await internModel.findOne({ mobile });
        if (existNumber) return res.status(400).send({ status: false, message: `'${mobile}' this mobile already exists.` });
        
        reqBody.collegeId = exitsCollegeName._id;
        //intern creation
        const newIntern = await internModel.create(reqBody);

        let data = {
            isDeleted: newIntern.isDeleted,
            name: newIntern.name,
            email: newIntern.email,
            mobile: newIntern.mobile,
            collegeId: newIntern.collegeId
        };
        return res.status(201).send({ status: true, message: 'Intern created successfully.', data: data });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, message: err.message });
    }
};

module.exports = { createInterns };
