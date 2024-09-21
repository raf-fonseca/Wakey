const ClockLines = () => {
    
    const foo = [];
    for (var i = 1; i <= 60; i++) {
        foo.push(i);
    }
    
    return (  
        <>
            {
                foo.map(e => {
                    const deg = e/60 * 360;
                    return (
                        <div
                            className="absolute text-neutral-300 z-10 font-thin"
                            style={{transform: 'translate(175px, 0)', rotate: `${deg}deg`}}
                        >
                            ___
                        </div>
                    )
                })
            }
        </>  
    )
}

export default ClockLines;