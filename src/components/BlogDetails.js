"use client"

import { Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';

const BlogDetails = ({remainingBlogContent, blogscontent}) => {
    return (
        <>
            <Container fluid className="blog-details-container">
                <Row className="mt-5 mb-5">
                    <Col md={3}>
                        <div className="">
                            <h4 className="related-blogs-title">Related Blogs</h4>
                            {remainingBlogContent && remainingBlogContent.map((post, index) => (
                                <div key={index} className="latest-news-item mb-4">
                                    <Link href={`/blog/${post.slug}`} className="latest-news-link text-decoration-none text-black">
                                        <Image src={post.medium_image} alt={post.title} className="latest-news-image" width={444} height={333}/>
                                        <div className="latest-news-info">
                                            <Row style={{ width: "100%" }}>
                                                <Col lg={8}>
                                                    <h6 className="latest-news-title">{post.title_en}</h6>

                                                </Col>
                                                <Col lg={4}>
                                                    <span className="latest-news-date">{post.post_date}</span>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col md={9} className='inside-blog-col-8'>
                        {blogscontent &&
                            <div className="blog-content">
                                <Image alt={blogscontent} src={blogscontent.image} className='blog-image mb-4' width={100} height={100}/>
                                {blogscontent && <div dangerouslySetInnerHTML={{ __html: blogscontent.description_en }} />}
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default BlogDetails