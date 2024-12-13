function Card({data}){
    return(
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                    <div className="font-bold text-l mb-2">{data.scientificName.toUpperCase()}</div>
                    <p className="text-gray-700 text-base">
                        Location: {data.country}, {data.state}<br/>
                        Family: {data.family}<br/>
                        Genus: {data.genus}<br/>
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.class}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.kingdom}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.phylum}</span>
                </div>
        </div>
    );
}
export default Card;