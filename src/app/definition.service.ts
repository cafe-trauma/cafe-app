import {Injectable} from '@angular/core';
import {Definition} from './question';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DefinitionService {
    public defObserver: Observable<Definition[]>;
    private _definitionUrl = '/api/definitions/';

    constructor(private http: HttpClient) {
        this.defObserver = http.get<Definition[]>(this._definitionUrl)
                            .share();
    }

    getDefinitions(){
        return this.defObserver;
    }
}
