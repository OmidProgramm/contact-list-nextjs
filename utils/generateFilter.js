export default function generateFilter({gen,search},user_id){
  const filter = {user_id}
  if(gen == 'male' || gen == 'female'){
    filter.gender=gen
  }
  if(search){
    filter.$or = [{firstName:search},{lastName:search}]
  }
  return filter
}