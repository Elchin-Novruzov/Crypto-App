import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { useGetCryptoByIdQuery } from '../services/cryptoApi';
import DOMPurify from "dompurify";

const Detail: React.FC = () => {
    const params = useParams();
    const { id } = params;

    const { data: coin, isLoading } = useGetCryptoByIdQuery(id);
    return (
        <>
            {isLoading ?
                <Spinner className='spinner' animation="grow" variant="light" />
                : <Container className="coin-container">
                    <Row className="content">
                        <Col className='text-center'>
                            <h2>{coin?.name}</h2>
                        </Col>
                    </Row>

                    <Row className="content rank-area">
                        <Col md={12}>
                            <div className="rank">
                                <span className="rank-btn">Rank # {coin?.market_cap_rank}</span>
                            </div>
                            <div className="info">
                                <div className="coin-heading">
                                    {coin?.image && <img src={coin?.image?.small} alt={coin.name} />}
                                    <p>{coin?.name}</p>
                                    {coin?.symbol && <p>{coin?.symbol.toUpperCase()}/USD</p>}
                                </div>
                                <div className="coin-price">
                                    {coin?.market_data?.current_price && (
                                        <h3>
                                            ${coin?.market_data.current_price?.usd.toLocaleString()}
                                        </h3>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="content">
                        <Col md={12}>
                            <div className="stats">
                                <div className="row">
                                    <h4>24 Hour Low</h4>
                                    {coin?.market_data?.low_24h && (
                                        <p>${coin?.market_data.low_24h.usd.toLocaleString()}</p>
                                    )}
                                </div>
                                <div className="row">
                                    <h4>24 Hour High</h4>
                                    {coin?.market_data?.high_24h && (
                                        <p>${coin?.market_data.high_24h.usd.toLocaleString()}</p>
                                    )}
                                </div>
                            </div>
                        </Col>

                        <Col md={12}>
                            <div className="stats">
                                <div className="row">
                                    <h4>Market Cap</h4>
                                    {coin?.market_data?.market_cap && (
                                        <p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
                                    )}
                                </div>
                                <div className="row">
                                    <h4>Circulating Supply</h4>
                                    {coin?.market_data && <p>{coin?.market_data.circulating_supply}</p>}
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="content">
                        <Col>
                            <div className="about">
                                <h3>About</h3>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            coin?.description ? coin?.description.en : ''
                                        ),
                                    }}
                                ></p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    );
};

export default Detail;
