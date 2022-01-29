module.exports = fcn => {
    return (req,res,next) => {
        fcn(req,res,next).catch(next);
    }
} 
