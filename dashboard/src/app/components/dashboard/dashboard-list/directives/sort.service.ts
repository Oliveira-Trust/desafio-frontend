import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {EmployeesDTO} from '../dto/employees.dto';
import {employeesMock} from '../../employees.mock';
// import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './sortable.directive';


@Injectable({providedIn: 'root'}) 
export class EmployeesService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _employees$ = new BehaviorSubject<EmployeesDTO[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor() {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._employees$.next(result.employees);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get getEmployees() { return this._employees$.asObservable(); }
  get getTotal() { return this._total$.asObservable(); }
  get getLoading() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let employees = sort(employeesMock, sortColumn, sortDirection);

    // 2. filter
    employees = employees.filter(employee => matches(employee, searchTerm));
    const total = employees.length;

    // 3. paginate
    employees = employees.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({employees, total});
  }
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(employees: EmployeesDTO[], column: SortColumn, direction: string): EmployeesDTO[] {
  if (direction === '' || column === '') {
    return employees;
  } else {
    return [...employees].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(employees: EmployeesDTO, term: string) {
  return employees.name.toLowerCase().includes(term.toLowerCase())
    || employees.surname.toLowerCase().includes(term.toLowerCase())
    || employees.departament.toLowerCase().includes(term.toLowerCase())
    || employees.position.toLowerCase().includes(term.toLowerCase())
    || employees.date.includes(term.toLocaleLowerCase())
}

interface SearchResult {
    employees: EmployeesDTO[];
    total: number;
  }
  
  interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
  }