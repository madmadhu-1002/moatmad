"use client";

import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from '@/styles/Header.module.css';
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';


export default function Header({menus}) {
      const [expanded, setExpanded] = useState(false);
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleSelect = () => {
    setExpanded(false);
  };

    return (
      <>
      <Navbar expand="lg" sticky='top' className="bg-gray-100 w-100 pt-0 pb-0"  expanded={expanded}>
        <Container fluid >
          <Navbar.Brand  as={Link} href={'/'}>
            <Image src='/assets/logo/Moatamad_Logo_W-O_TagLine++.png' alt="Logo" width={120} height={27}/>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} style={{height: "50px"}}/>
          <Navbar.Collapse id="basic-navbar-nav">
            <div style={{ display: 'grid', width: "100%" }} >
              <Row >
                <Col lg={12} className={styles.upperColumn}>
                  <h6>
                    <a href="mailto:info@moatamadcars.com" className={styles.upperColumn}  style={{ textDecoration: "none", color: "inherit" }}>
                      <MdOutlineEmail  />&nbsp;info@moatamadcars.com
                    </a>
                  </h6>
                  <h6>
                    <a href="tel:600562621" className={styles.upperColumn} style={{ textDecoration: "none", color: "inherit" }}>
                      <FaPhoneAlt size={'12px'} />&nbsp;600 562621
                    </a>
                  </h6>
                  <h6>
                    <a href="https://www.google.com/search?q=Moatamad+Cars" target="_blank" rel="noopener noreferrer" className={styles.upperColumn} style={{ textDecoration: "none" }}>
                      <img src="https://c.tenor.com/Rwmnr_eC0sMAAAAC/tenor.gif" alt="Animated Icon" width={'60px'} height={'27px'} style={{ objectFit: "cover" }} />
                      <img src='/assets/logo/Google_Rating_Star-01 1.png' width={'83px'} style={{ height: "27px", position: "relative", left: "-8%" }} alt="Star Rating" />
                    </a>
                  </h6>
                  <h6 style={{ cursor: "pointer" }} >
                    <Link href='/contact' className={styles.upperColumn} style={{ textDecoration: "none", color: 'black' }}>
                      <MdOutlineEmail /> Contact
                    </Link>
                  </h6>
                </Col>
              </Row>
              <hr className="w-100 border border-secondary my-0" />
              <Nav className="ms-auto d-flex justify-content-end w-100 align-items-center">
                {menus && menus?.map((item, index) => (
                  item.children && item.children.length > 0 ? (
                    <NavDropdown title={item.menu_name_en}  id={`basic-nav-dropdown-${index}`} key={index} >
                      {item.children.map((subItem, subIndex) => (
                        <NavDropdown.Item as={Link} onClick={handleSelect} className="custom-nav-link" href={`/${subItem.slug}`} key={subIndex} >
                          {subItem.menu_name_en}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  ) : item.paddinglast ? (
                    <Nav.Link className="custom-nav-link"  style={{ padding: "5px 5px 5px 20px" }} as={Link} href={`/${item.url}`} key={index} onClick={handleSelect}>
                      {item.menu}
                    </Nav.Link>
                  ) : (
                    <Nav.Link className="custom-nav-link"  style={{ padding: "5px 20px" }} as={Link} href={`/${item.slug}`} key={index} onClick={handleSelect}>
                      {item.menu_name_en}
                    </Nav.Link>
                  )
                ))}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
    );
  }
  