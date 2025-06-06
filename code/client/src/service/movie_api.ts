class MovieAPI{
    private route = 'movie';
    //Selectionner tous les enregistrements
    public SelectAll = async () => {


        const request = new Request
        (`${import.meta.env.VITE_API_URL}/movie`

        );
        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        return response.json(); // Appelé uniquement si la réponse est OK
    };
    //Selectionner un enregistrement
    public SelectOne = async (id: number) => {
        const request = new Request(
            `${import.meta.env.VITE_API_URL}/movie/${id}`
        );
        const response = await fetch(request);
        return response.json();
    };

    //Créer un enregistrement
    public insert = async (data:FormData, token: string) => {
        const request = new Request
        (`${import.meta.env.VITE_API_URL}/movie`, {
            method: 'POST', 
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: data
        });
        const response = await fetch(request);
        return response.json();
    };
    
    //Mettre à jour un enregistrement
    public update = async (data:FormData, token: string) => {
        const request = new Request
        (`${import.meta.env.VITE_API_URL}/movie`, {
            method: 'PUT', 
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: data
        });
        const response = await fetch(request);
        return response.json();
    };

    //Supprimer un enregistrement
    public delete = async (data: FormData) => {
        const request = new Request
        (`${import.meta.env.VITE_API_URL}/${this.route}`, {
            method: 'DELETE',
            body: data
        });
        const response = await fetch(request);
        return response.json();
    }
}
export default MovieAPI;