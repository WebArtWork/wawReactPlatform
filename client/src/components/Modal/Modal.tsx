import React, { useEffect, useState } from "react";
import axios from "axios";

export const Modal = (props: any) => {
    const [passInput, setPassInput] = useState('')
    if (!props.show) {
        return null
    }

    return (
        <div className="modal">
            <div className="modal__container">
                <header className="modal__header">
                    <h1 className="modal__title">Change password</h1>
                </header>
                <main className="modal__content">
                    <input className="w-forms__input input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={passInput}
                        onChange={(e) => setPassInput(e.currentTarget.value)}
                    />
                </main>
                <footer className="modal__footer">
                    <button className="w-btn _second" type="button" onClick={props.onClose}>Close</button>
                    <button className="w-btn _primary">Save changes</button>
                </footer>
            </div>
        </div>
    )
}
