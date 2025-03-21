import { Card, Col, Container, Row } from 'react-bootstrap'
import { FaHandPointRight } from "react-icons/fa";
import Link from 'next/link';
import styles from '@/styles/Blog.module.css'
import Image from 'next/image';

const Blog = ({carblogs}) => {
  return (
    <Container fluid className='mb-5' style={{padding:"0px 40px "}}>
                <div className={`mt-5 mb-5 ${styles.productsHeading}`}>
                    <h3>Latest Blogs</h3>
                </div>
                <Row>
                    <Col lg={12}>
                        <Row>
                            {carblogs && carblogs.map((item) => {
                                return (
                                    <Col lg={4} key={item.id} as={Link} href={item.slug} style={{textDecoration:"none"}}>

                                        <Card className={styles.whyChooseUs}>
                                            <Image src={item.medium_image} alt='item image' width={100} height={100} className='mb-2'/>
                                            <h6>{item.post_date}</h6>
                                            <p>< FaHandPointRight /> {item.title_en}</p>
                                        </Card>

                                    </Col>
                                )
                            })}

                        </Row>
                    </Col>

                </Row>





            </Container>
  )
}

export default Blog