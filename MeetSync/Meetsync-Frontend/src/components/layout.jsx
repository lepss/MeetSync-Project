const Layout = () =>{
    return(
        <section className="section">
            <h2 className="section-title">Section Title</h2>
            <div className="container">
                <div className="content">
                    <div className="sub-content">
                        <h3 className="sub-content-title">Sub Content Title</h3>
                        <div className="sub-group">
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam adipisci consectetur voluptatum odit esse veritatis non minus eos aut, modi saepe tempora dignissimos necessitatibus beatae ipsa reprehenderit molestiae, atque sit.</p>
                        </div>
                        <div className="sub-group">
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam adipisci consectetur voluptatum odit esse veritatis non minus eos aut, modi saepe tempora dignissimos necessitatibus beatae ipsa reprehenderit molestiae, atque sit.</p>
                        </div>
                    </div>
                    <div className="sub-content">
                        <h3 className="sub-content-title">Sub Content Title</h3>
                        <div className="sub-group">
                            <figure>
                                <img src="https://placehold.co/300x300" alt="image"/>
                            </figure>
                        </div>
                        <div className="sub-group">
                            <ul>
                                <li>Element 01</li>
                                <li>Element 02</li>
                                <li>Element 03</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Layout