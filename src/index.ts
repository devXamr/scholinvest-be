import express from 'express'
import {PrismaClient} from '@prisma/client'
const app = express()
const prisma = new PrismaClient()

app.use(express.json())


//handles the creation of a user, does not give a type.
app.post('/signup', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const type = ''
    const doesOneExist = await prisma.user.findFirst(
        {where: {email}}
    )
    if(doesOneExist){
        res.json({
            msg: 'A user with this email already exists, sign in instead',
            success: false
        })
    } else {
        const createTheUser = await prisma.user.create({
            data: {
                email,
                password,
                type
            }
        })
        if(createTheUser){
            res.json({
                msg: 'user created successfully',
                success: true
            })
        }
    }
})


app.post('/signin', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const isLegit = await prisma.user.findFirst({
        where: {email, password}
    })

    if(!isLegit) {
        res.json({
            success: false,
            reason: "incorrect credentials"
        })
    } else {
        res.json({
            success: true,
            msg: "sign-in successful"
        })
    }
})

app.post('/studentdeets',async (req, res) => {
    const {fullName, courseEnrolled, email,uni,currentCGPA,annualIncome,graduationYear,briefDescription,applications} = req.body.userInfo
    const userEmail= req.body.email
    const assignType = await prisma.user.update({
        where: {
            email: userEmail
        },
        data: {
            type: 'Student'
        }
    })

    const pushAllUserInfo =  await prisma.student.create({
        data: {
            fullName,
            courseEnrolled,
            email,
            uni,
            currentCGPA,
            annualIncome,
            graduationYear,
            briefDescription,
            applications
        }
    })

    if(!pushAllUserInfo){
        res.json({
            msg: 'There was an error',
            success: false
        })
    } else {
        res.json({
            msg: "user data logged successfully",
            success: true
        })
    }


})

app.get('/studentdeets', async (req, res) => {
    const email = req.body.email

    const findStudent = await prisma.student.findFirst({
        where: {email}
    })

    if(!findStudent){
        res.json({
            msg: 'there is no user associated with this email',
            success: false

        })

    } else {
        res.json({
            findStudent,
            success: true
        })
    }
})

app.post('/investordeets', async(req, res) => {
    const userEmail = req.body.email
    const {fullName, email, linkedInURL, twitterURL} = req.body.userInfo


    const findUser = await prisma.user.update({
        where: {email: userEmail},
        data: {type: "Investor"}
    })


    const enterInvestorData = await prisma.investor.create({
        data: {
            fullName,
            email,
            linkedInURL,
            twitterURL

        }
    })

    if(!enterInvestorData){
        res.json({
            msg: 'there was an error',
            success: false
        })
    } else {
        res.json({
            success: true
        })
    }
})

app.get('/investordeets', async (req, res) => {
    const email = req.body.email

    const findInvestor = await prisma.investor.findFirst({
        where: {email}
    })

    if(!findInvestor){
        res.json({
            success: false
        })
    } else {
        res.json({
            findInvestor,
            success: true
        })
    }
})







app.listen(3005, () => {
    console.log('The server is listening on port 3005. ')
})