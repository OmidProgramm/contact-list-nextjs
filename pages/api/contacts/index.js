import Contact from "@/models/Contact";
import connectDB from "@/utils/connectDB";
import generateFilter from '@/utils/generateFilter'

const handler = async (req, res) => {
  connectDB();
  if (req.method == "GET") {
     getHandler(req,res)
    
  } else if (req.method == "POST") {
     postHandler(req,res)
  } else {
    res.status(405).json({ message: "Method does not allowed" });
  }
};
export default handler;

async function getHandler(req,res){
    const { user_id, gen, search } = req.query;
    const filter = generateFilter({gen, search },user_id)
    const contacts = await Contact.find(filter,'-__v')
    console.log(contacts)
    res.status(200).json(contacts);
}
async function postHandler(req,res){
    try {
      const contact = await Contact.create(req.body);
      res.status(201).json({ message: "Contact added successfully." });
    } catch (error) {
      if (error.name == "ValidationError") {
        let errorMessage = "";
        Object.values(error.errors).map(
          (err) => (errorMessage += err.message + `\n`),
        );
        return res.status(422).json({ message: errorMessage });
      }
      res.status(500).json({ message: "Server not found" });
    }
}
