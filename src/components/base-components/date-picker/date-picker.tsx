import React, { Component, useEffect, useState } from 'react';

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './date-picker.scss';

interface iDatePicker {
    className?: string;
    emitDate: Function;
    children: any;
}

function DatePicker (props: iDatePicker) {

    const [selectionRange, setSelectionRange] = useState({ startDate: new Date(), endDate: new Date(), key: 'selection' });
    const [activeDate, setActiveDate] = useState(false);

    const closeModal = (sendDate = false) => {
        document.body.style.overflow = '';
        const dateModal: any = document.querySelector('.ps-date-picker');
        const modalContent: any = document.querySelector('.date-picker-content');
        if (dateModal && modalContent) {
            dateModal.style.opacity = '';
            dateModal.style.pointerEvents = '';
            modalContent.style.transform = '';
        }
        if (sendDate) {
            props.emitDate({
                startDate: selectionRange.startDate?.toISOString()?.split('T')[0],
                endDate: selectionRange.endDate?.toISOString()?.split('T')[0],
            });
        }
        setActiveDate(false);
        setSelectionRange({ startDate: new Date(), endDate: new Date(), key: 'selection' });
    }
    
    const handleSelect = (ranges: any) => {
        setSelectionRange(ranges.selection)
        console.log({range: ranges.selection?.endDate?.toISOString()?.split('T')[0]});
        setActiveDate(ranges.selection.startDate !== ranges.selection.endDate);
    }
    const openModal = () => {
        const screenWidth = window.innerWidth;
        console.log({screenWidth})
        document.body.style.overflow = 'hidden';
        const dateModal: any = document.querySelector('.ps-date-picker');
        const modalContent: any = document.querySelector('.date-picker-content');
        setTimeout(() => {
            if (dateModal && modalContent) {
                dateModal.style.opacity = '1';
                dateModal.style.pointerEvents = 'all';
                modalContent.style.transform = (screenWidth > 650) ? 'scale(1)' : 'scale(0.8)';
            }
        }, 200);
    }

    useEffect(() => {
      
    }, []);
    
    return (
        <>
            <button onClick={openModal} className={props.className}>{props.children}</button>
            <div className='ps-date-picker'>
                <div className='date-picker-bg'></div>
                <div className='date-picker-holder'>
                    <div className='date-picker-content'>
                        <DateRangePicker
                            ranges={[selectionRange]}
                            onChange={handleSelect}
                        />
                        <div className=' text-center'>
                            <button className='mx-2 solid-button-danger' onClick={() => closeModal()}>Cancel</button>
                            <button className='mx-2 solid-button-success' onClick={() => closeModal(true)} disabled={!activeDate}>Proceed</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DatePicker;