
export class Recensione {
    private review: string;
    private rating: number;
    private status: string;
    private address: string;

    constructor(review: string, rating: number, status: string, address: string) {
        this.review = review;
        this.rating = rating;
        this.status = status;
        this.address = address;
    }

    public getReview(): string {
        return this.review;
    }

    public setReview(review: string): void {
        this.review = review;
    }

    public getRating(): number {
        return this.rating;
    }

    public setRating(rating: number): void {
        this.rating = rating;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string): void {
        this.status = status;
    }

    public getAddress(): string {
        return this.address;
    }

    public setAddress(address: string): void {
        this.address = address;
    }
}