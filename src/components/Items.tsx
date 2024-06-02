import React from 'react'
import { CoinType } from '../types/CoinsType'
import { Link } from 'react-router-dom';

export interface PropsFunction {
    coin: CoinType;
}

export const Items: React.FC<PropsFunction> = ({ coin }) => {
    return (
        <tr>
            <td>{coin.market_cap_rank}</td>
            <td>
                <Link to={`/detail/${coin.id}`} key={coin.id} className="img-info">
                    <img src={coin?.image} alt={coin?.name} />
                    <p>{coin?.symbol.toUpperCase()}</p>
                </Link>
            </td>
            <td>${coin.current_price.toLocaleString()}</td>
            <td>{coin.price_change_percentage_24h.toFixed(2)}%</td>
            <td>${coin.total_volume.toLocaleString()}</td>
            <td>${coin.market_cap.toLocaleString()}</td>
        </tr>
    )
}
