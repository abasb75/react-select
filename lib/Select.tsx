import './styles.css';
import Arrow from "./components/Arrow";
import { useEffect, useRef, useState } from 'react';
import { MouseEvent } from 'react';

import { ISelectOption, ISelectOptionComponent, ISelectValueComponent } from './type';



interface SelectProps{

    className?:string;
    optionClassName?:string;
    activeOptionClassName?:string;
    optionsClassName?:string;
    arrowClassName?:string;
    arrowSvgClassName?:string;
    valueClassName?:string;
    
    options:ISelectOption[],
    placeholder?:string,
    defaultValue?:string|undefined|null,
   
    style?:React.CSSProperties;
    optionsStyle?:React.CSSProperties;
    optionStyle?:React.CSSProperties;
    arrowStyle?:React.CSSProperties;
    arrowSvgStyle?:React.CSSProperties;
    valueStyle?:React.CSSProperties;
    activeOptionStyle?:React.CSSProperties;

    OptionComponent?:ISelectOptionComponent;
    ValueComponent?:ISelectValueComponent;

    onChange?:(option?:ISelectOption)=>void;
    
}

function Select({
    className='',
    placeholder='Select ...',

    defaultValue=null,
    options,

    style={},
    optionsStyle={},
    optionStyle={},
    arrowStyle={},
    arrowSvgStyle={},
    valueStyle={},
    activeOptionStyle={},

    OptionComponent,
    ValueComponent,

    optionClassName='',
    optionsClassName='',
    activeOptionClassName='',
    arrowClassName='',
    arrowSvgClassName='',
    valueClassName='',

    onChange=()=>{},
}:SelectProps) {

    const selectRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const [selectedOption,setSelectedOption] = useState(options.find(o=>o.value===defaultValue || null));
    const [displayOption,setDisplayOption] = useState(false);

    const selectOption = (event:MouseEvent<HTMLDivElement>,option:ISelectOption)=>{
        event.preventDefault();
        setSelectedOption(prev=>option || prev);
        setDisplayOption(false);
    }

    useEffect(()=>{
        onChange(selectedOption);
        
    },[selectedOption]);

    return (<div className={`abasb75-react-select-container ${className}`} ref={selectRef} style={style}>
        <div 
        onClick={()=>setDisplayOption(prev=>!prev)}
        className="abasb75-react-select-value-wrapper">
            <div className={`abasb75-react-select-arrow ${arrowClassName}`} style={arrowStyle} >
                <Arrow style={arrowSvgStyle} className={arrowSvgClassName}/>
            </div>
            {ValueComponent ? <ValueComponent option={selectedOption} placeholder={placeholder} /> :<div className={`abasb75-react-select-value ${valueClassName}`} style={valueStyle}>
                <div className={`abasb75-react-select-value-label ${selectedOption ? 'value' : 'placeholder'}`}>{selectedOption?.label || placeholder}</div>
            </div>}
        </div>
        <div 
        style={{
            ...optionsStyle,
            display:displayOption?'block':'none',
        }}
        ref={optionsRef} 
        className={`abasb75-react-select-options ${optionsClassName}`}>
            {options.map((option,index)=>(
            <div key={index} onClick={(e)=>selectOption(e,option)}> 
                { OptionComponent ? <OptionComponent 
                option={option}
                selectedOption={selectedOption} 
                /> :
                <div 
                className={`abasb75-react-select-option {${optionClassName} ${selectedOption?.value === option.value ? (activeOptionClassName || 'active') : ''}`}
                style={{
                    ...optionStyle,
                    ...(selectedOption?.value === option.value ? activeOptionStyle:{})
                }}
                >
                    {option.label}
                </div>}
            </div>))}
        </div>
    </div>);
}



export default Select;