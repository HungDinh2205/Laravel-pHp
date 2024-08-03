import React from 'react';

export default function Home() {
    return (
        <main>
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 style={{ color: 'black' }}>Welcome to Apple</h1>
                        <p style={{ color: 'black' }}>Discover the latest innovations</p>
                        <a href="#" className="btn">Explore Now</a>
                    </div>
                </div>
            </section>
            <section className="features">
                <div className="container">
                    <h2>Discover Our Products</h2>
                    <div className="feature-list">
                        <div className="feature">
                            <img src="imgapple/mac-card-40-macbook-air-m2-m3-202402.jpeg" alt="Mac" />
                            <h3>Mac</h3>
                            <p>Power to do whatever you want.</p>
                        </div>
                        <div className="feature">
                            <img src="imgapple/iphone-card-40-iphone15hero-202309.jpeg" alt="iPhone" />
                            <h3>iPhone</h3>
                            <p>A new era of iPhone.</p>
                        </div>
                        <div className="feature">
                            <img src="imgapple/ipad-card-40-pro-202210.jpeg" alt="iPad" />
                            <h3>iPad</h3>
                            <p>Delightfully capable.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="testimonials">
                <div className="container">
                    <h2>What Our Customers Say</h2>
                    <div className="testimonial">
                        <p>"I love my Apple products. They're reliable and beautifully designed."</p>
                        <cite>- John Doe</cite>
                    </div>
                    <div className="testimonial">
                        <p>"Apple has revolutionized the way I work and communicate. I can't imagine life without it."</p>
                        <cite>- Jane Smith</cite>
                    </div>
                </div>
            </section>
            <section className="news">
                <div className="container">
                    <h2>Latest News</h2>
                    <div className="article">
                        <div className="article-thumbnail">
                            <img src="imgapple/mac-card-40-imac-24-202310.jpeg" alt="New MacBook Pro" />
                        </div>
                        <div className="article-content">
                            <h3>Introducing the New iMac Pro</h3>
                            <p>Discover the powerful features of the new MacBook Pro, designed for creators and professionals.</p>
                            <a href="#" className="btn">Read More</a>
                        </div>
                    </div>
                    <div className="article">
                        <div className="article-thumbnail">
                            <img src="imgapple/iphone-card-40-accessories-202403.jpeg" alt="iPhone 15" />
                        </div>
                        <div className="article-content">
                            <h3>Apple Announces iPhone MagSafe</h3>
                            <p>Find out when you can get your hands on the latest iPhone, equipped with groundbreaking technology.</p>
                            <a href="#" className="btn">Read More</a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact">
                <div className="container">
                    <h2>Contact Us</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" className="form-control" rows="4"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Send Message</button>
                    </form>
                </div>
            </section>
        </main>
    );
}
