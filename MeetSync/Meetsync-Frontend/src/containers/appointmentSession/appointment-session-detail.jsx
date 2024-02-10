import {useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom";

const AppointmentSessionDetail = () =>{
    const params = useParams();

    useEffect(()=>{

    }, [])

    return(
        <section className="section">
            <h2 className="section-title">Content Title</h2>
            <div className="container">
                <div className="content">
                    <div className="sub-content">
                        <h3 className="sub-content-title">Sub Content Title</h3>
                        <div className="sub-group">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AppointmentSessionDetail