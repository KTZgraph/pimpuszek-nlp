// https://youtu.be/Gz9bvYybaws?t=357
import supabase from "../../services/supabase/connector";

export default function handler(req, res) {
  console.log(supabase);
  res.status(200).json({ data: supabase });
}
