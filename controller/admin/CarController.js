const CarModel = require('../../model/car')

class CarController{
    static carInsert =async (req,res)=>{
        try {
            // console.log(req.body)
            const {cname,cbrand,discription,price,fueltype,modelyear,seatcapacity,AC,PS,cdplayer,PDL,airbagD,CL,ABT,airbagP,CS,PW,BA,LS}=req.body
            const car = await CarModel.create({
                cname,
                cbrand,
                discription,
                price,
                fueltype,
                modelyear,
                seatcapacity,
                AC,
                PS,
                cdplayer,
                PDL,
                airbagD,
                CL,
                ABT,
                airbagP,
                CS,
                PW,
                BA,
                LS
            })
            req.flash('success','New CarDetail Added !')
            res.redirect('/admin/addcar')
        } catch (error) {
            console.log(error)
        }
    }
    static deleteCarDetail = async(req,res)=>{
        try {
            const id = req.params.id
            const car = await CarModel.findByIdAndDelete(id)
            req.flash('error','Car Detail Deleted !')

            res.redirect('/admin/addcar')
        } catch (error) {
            confirm.log(error)
        }
    }
}
module.exports=CarController