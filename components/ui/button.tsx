interface Props{
    label?:string;
    onClick?: () => void;
}

const Button = (props:Props)=>{
    const {label,onClick} = props
    return(
        <button onClick={onClick}>
            {label}
        </button>
    )
}

export default Button