import Url from "../models/urlModel.js";
import generateRandomString from '../helpers/generateRandomString.js'
const createLink = async (req, res) => {
    try {
      const { longUrl, alias, expireDate } = req.body;
      console.log()
      const userId = req.user.id;
  
      if (!longUrl) {
        return res.status(400).json({ success: false, message: 'longUrl is required' });
      }
  
      let shortCode = alias;
  
      if (!shortCode) {
        shortCode = generateRandomString(6);
  
        while (true) {
          const existingUrl = await Url.findOne({ alias: shortCode });
          if (!existingUrl) break;
          shortCode = generateRandomString(6);
        }
      } else {
        const existingUrl = await Url.findOne({ alias: shortCode });
        if (existingUrl) {
          return res.status(400).json({ success: false, message: 'Alias already in use' });
        }
      }
  
      const newUrl = new Url({
        user: userId,
        longUrl,
        alias: shortCode,
        expireDate: expireDate ? new Date(expireDate) : null,
      });
  
      await newUrl.save();

  
      res.status(201).json({
        success: true,
        message: 'Short URL created successfully',
        data: {
          longUrl,
          alias: shortCode,
          expireDate,
          userId,
        },
      });
    } catch (error) {
      console.error('Error creating short URL:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

  const getAllUrls=async(req,res)=>{
    try {
      const data=await Url.find({})
      console.log(data)
      return res.json({
        success:true,
        data:data
      })

    } catch (error) {
    
      return res.send({
        success:false,
        message:error.message
      })
      
    }

  }
export {createLink ,getAllUrls}  