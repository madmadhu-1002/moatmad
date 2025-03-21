"use client"

import { useEffect } from "react";
import { Col, Container, Form, Row, Card, Accordion } from 'react-bootstrap';
import { FaHandPointRight } from "react-icons/fa";
import HTMLReactParser from 'html-react-parser/lib/index';
import styles from '@/styles/Finance.module.css'
import EmiCalculator from "./EmiCalculator";

const Finance = ({FinanceData, DescriptionComponent}) => {
  console.log("hello sinance client")
    useEffect(() => {
        window.scrollTo(0, 0);
    },[])
  return (
    <>
    <Container fluid className={styles.financePage} >
        <Row style={{ padding: "0px 42px", display: "flex", justifyContent: "space-between" }}>
          <Col lg={6} style={{ padding: "0px" }} >
            <EmiCalculator />
          </Col>
          <Col lg={6} className={`mt-5 ${styles.financeContent}`} style={{ paddingLeft: "40px", paddingRight: '0px' }}>
           
           <div>
            {console.log("hy")}
            {FinanceData && FinanceData.content && <div className="m-5" dangerouslySetInnerHTML={{ __html: FinanceData.content.description_en }} />}
    
            </div>
          </Col>





        </Row>
      </Container>
      <Container fluid style={{ padding: "0px 54px 40px 0px", backgroundColor: "#f8d4b094" }} className='mt-3'>
        <Row className='' style={{ display: "flex", justifyContent: "center" }}>
          <Col lg={12}>
            <div className={`mt-3 mb-3 ${styles.productsHeading}`}>
              <h3 className='text-start'>FAQs</h3>
            </div>
          </Col>

          <Col lg={8} >
            <Accordion defaultActiveKey="0">
              {FinanceData && FinanceData.faqs?.map((item) => {
                return (
                  <Accordion.Item key={item.id} eventKey={item.id}>
                    <Accordion.Header>Q. {item.question_en}</Accordion.Header>
                    <Accordion.Body className='accordion-body-FinanceData'>
                      <div className='right-hand-icon'>
                        <FaHandPointRight />
                      </div>&nbsp;
                      <div> {HTMLReactParser(item.answer_en)}</div>
                    </Accordion.Body>

                  </Accordion.Item>
                )
              })}
            </Accordion>

          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Finance