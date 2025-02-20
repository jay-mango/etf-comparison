from flask import Flask, jsonify
import yfinance as yf

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health_check():
    """
    Simple route to check if the API is up and running.
    """
    return jsonify({'status': 'ok', 'message': 'Service is up'})

@app.route('/etf/<string:symbol>/holdings', methods=['GET'])
def get_etf_holdings(symbol):
    """
    Fetch top holdings for the ETF specified by <symbol>.
    For popular ETFs (e.g., SPY, QQQ, VTI), yfinance often returns
    the top 10 holdings. Some ETFs might not return any holdings data.
    """
    ticker = yf.Ticker(symbol)
    info = ticker.info

    print("DEBUG: ", info)  # <--- Add this line

    # 'holdings' can vary; sometimes it's 'topHoldings' in older versions,
    # but often yfinance merges them into the 'info' dictionary under 'holdings'.
    holdings_data = info.get('holdings')

    if not holdings_data:
        return jsonify({
            'symbol': symbol.upper(),
            'message': 'No holdings data found, or data not provided by Yahoo Finance.'
        }), 404

    return jsonify({
        'symbol': symbol.upper(),
        'holdings': holdings_data
    })

if __name__ == '__main__':
    # Run on localhost port 5000 by default (http://127.0.0.1:5000)
    app.run(debug=True)
