const NumberInput = ({time, setTime, idx, id, getInputs}) => {

    return (
        <>
            <input 
                id={id}
                type="text" 
                className="
                    w-full aspect-square p-2
                    flex justify-center items-center text-center
                    bg-white bg-opacity-0
                    border border-solid border-white border-opacity-10 rounded-lg
                    focus:bg-opacity-5 focus:border-opacity-20
                    outline-none
                    text-white text-2xl
                    transition-all duration-200 ease-in-out
                "
                value={time[idx]}
                onChange={e => {
                    const inputs = getInputs();
                    const len = e.target.value.length;
                    if(!Number(e.target.value) && e.target.value !== '' && e.target.value != 0) return;
                    if(len > 1) {
                        setTime(prev => {
                            var newArr = [...prev];
                            newArr[idx] = e.target.value[1];
                            return newArr;
                        });
                    } else {
                        setTime(prev => {
                            var newArr = [...prev];
                            newArr[idx] = e.target.value;
                            return newArr;
                        });
                    }
                    // if(idx + 1 < inputs.length) inputs[idx + 1].focus();
                }}
            />
            {idx === 1 && <div className="text-white text-xl">:</div>}
        </>
    )
}

export default NumberInput;