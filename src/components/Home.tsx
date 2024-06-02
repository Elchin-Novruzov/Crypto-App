import React, { useEffect, useState } from 'react';
import { useGetAllCryptoQuery, useGetCryptosMutation } from '../services/cryptoApi';
import Table from 'react-bootstrap/Table';
import { CoinType } from '../types/CoinsType';
import { Items } from './Items';
import Button from 'react-bootstrap/Button';
import Search from './Search';
import Spinner from 'react-bootstrap/Spinner';

const Home: React.FC = () => {
    const [getCrypto, { data: cryptos }] = useGetCryptosMutation();
    const { data, isLoading } = useGetAllCryptoQuery()
    const [perPage, setPerpage] = useState<string>('10')
    const [name, setName] = useState<string>('')
    const [page, setPage] = useState(1)
    const pages = ["5", "10", "15", "20", "25", "30"];

    const filteredCoins = data?.filter((coin) =>
        coin.name.toLowerCase().includes(name.toLowerCase())
    );

    const handlePage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPerpage(e.target.value);
    };

    useEffect(() => {
        fetchData()
    }, [page, perPage]);

    const fetchData = async () => {
        await getCrypto({ page, perPage });
    }

    return (
        <main>
            <Search name={name} setName={setName} />
            {isLoading ? (
                <Spinner className='spinner' animation="grow" variant="light" />
            ) : (
                <div className='table-area'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Coin</th>
                                <th>Price</th>
                                <th>24h</th>
                                <th>Volume</th>
                                <th>Market Cap</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!name ? (
                                cryptos && cryptos.length > 0 ? (
                                    cryptos.map((coin: CoinType, idx: number) => (
                                        <Items coin={coin} key={idx} />
                                    ))
                                ) : (
                                    <td className='text-center p-4 text-danger fw-bold fs-5' colSpan={6}>No data available</td>
                                )
                            ) : (
                                filteredCoins && filteredCoins.length > 0 ? (
                                    filteredCoins.map((coin: CoinType, idx: number) => (
                                        <Items key={idx} coin={coin} />
                                    ))
                                ) : (
                                    <td className='text-center p-4 text-danger fw-bold fs-5' colSpan={6}>No data available</td>
                                )
                            )}
                        </tbody>
                    </Table>
                </div>
            )}

            {cryptos && (
                <div className="flex-area">
                    <div className="button-control">
                        <Button
                            disabled={page === 1}
                            onClick={() => setPage((page) => page - 1)}
                            variant="outline-light"
                        >
                            Prev
                        </Button>
                        <span className="fs-5 color-red"> {page} </span>
                        <Button
                            onClick={() => setPage((page) => page + 1)}
                            variant="outline-light"
                        >
                            Next
                        </Button>
                    </div>

                    <div>
                        <span>Per Page: </span>
                        <select value={perPage} onChange={handlePage}>
                            {pages.map((page, index) => (
                                <option key={index}>{page}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Home;
