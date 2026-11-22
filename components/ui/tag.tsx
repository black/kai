interface Props{
    label:string;
}
const Tag = (props:Props) =>{
    const {label} = props
    return(
        <div className="rounded-full font-light border border-gray-200 whitespace-nowrap py-3 px-6">
             {label}   
        </div>
    )
}

export default Tag