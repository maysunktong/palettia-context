export default function Button({variant, type, text}){
  const variant = [
  {"default": ""},
  {"logOut": ""},
  {"outline": ""},
  ]
  return (
    <button type={type} className={`${variant}`}>
{text}
    </button>
  )
}
