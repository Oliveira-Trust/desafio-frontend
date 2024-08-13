import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { User } from '@/types/user.type';
import { exportUsersToCSV } from '@/utils/export.utils';

describe('exportUsersToCSV', () => {
  let createElementSpy: any;
  let appendChildSpy: any;
  let removeChildSpy: any;
  let setAttributeSpy: any;
  let clickSpy: any;
  let downloadSpy: any;


  const mockUserData: User[] = [
    {
      id: 1,
      nome: 'Usuario',
      sobrenome: 'Teste',
      email: 'teste@example.com',
      endereco: '123 Main St',
      data_nascimento: '1990-01-01',
      data_abertura: '2020-01-01',
      valor_carteira: 1000,
      endereco_carteira: '0x123',
    },
  ];

  beforeEach(() => {
    // Reseta todos os mocks
    vi.restoreAllMocks();

    // Mock para document.createElement e os métodos do elemento <a>
    setAttributeSpy = vi.fn();
    clickSpy = vi.fn();
    downloadSpy = vi.fn();

    createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue({
      setAttribute: setAttributeSpy,
      click: clickSpy,
      download: downloadSpy
    } as any);

    appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation((() => {}) as any);
    removeChildSpy = vi.spyOn(document.body, 'removeChild').mockImplementation((() => {}) as any);

    // Mock para URL.createObjectURL
    (global.URL as any).createObjectURL = vi.fn(() => 'mockURL');
  });

  it('should export users to CSV correctly using saveblob', () => {
    const mockMsSaveBlob = vi.fn();
    (navigator as any).msSaveBlob = mockMsSaveBlob;


    exportUsersToCSV(mockUserData);

    // Verifica se o elemento <a> foi criado
    expect(createElementSpy).toHaveBeenCalledWith('a');

    expect(mockMsSaveBlob).toHaveBeenCalled();

    // Limpa o mock após o teste
    delete (navigator as any).msSaveBlob;
  });

  it('should export users to CSV correctly using download element click', () => {
    (navigator as any).msSaveBlob = null;

    exportUsersToCSV(mockUserData);

    // Verifica se o elemento <a> foi criado
    expect(createElementSpy).toHaveBeenCalledWith('a');

    // Verifica se o setAttribute foi chamado com os parâmetros corretos
    expect(setAttributeSpy).toHaveBeenCalledWith(
      'download',
      expect.stringMatching(/^carteira-usuarios-\d{4}-\d{2}-\d{2}T/)
    );

    // Verifica se o appendChild foi chamado
    expect(appendChildSpy).toHaveBeenCalledWith({
      setAttribute: setAttributeSpy,
      click: clickSpy,
      download: downloadSpy,
      href: 'mockURL',
    });

    // Verifica se o click foi chamado
    expect(clickSpy).toHaveBeenCalled();

    // Verifica se o removeChild foi chamado
    expect(removeChildSpy).toHaveBeenCalledWith({
      setAttribute: setAttributeSpy,
      click: clickSpy,
      download: downloadSpy,
      href: 'mockURL',
    });

    // Limpa o mock após o teste
    delete (navigator as any).msSaveBlob;
  });

  it('should export users to CSV correctly using location assign', () => {
    const mockMsSaveBlob = null;
    (navigator as any).msSaveBlob = mockMsSaveBlob;
    
    const location: any = new URL('https://www.example.com')
    location.assign = vi.fn()

    delete (window as any).location
    window.location = location

    createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue({
      setAttribute: setAttributeSpy,
      click: clickSpy,
    } as any);

    exportUsersToCSV(mockUserData);

    // Verifica se o elemento <a> foi criado
    expect(createElementSpy).toHaveBeenCalledWith('a');

      expect(window.location.assign).toHaveBeenCalledWith('data:text/csv;encoding:utf-8,ID%2CNome%2CSobrenome%2CEmail%2CEndere%C3%A7o%2CData%20de%20Nascimento%2CData%20de%20Abertura%2CValor%20da%20Carteira%2CEndere%C3%A7o%20da%20Carteira%0A1%2CUsuario%2CTeste%2Cteste%40example.com%2C123%20Main%20St%2C1990-01-01%2C2020-01-01%2C1000%2C0x123');
  
    // Limpa o mock após o teste
    delete (navigator as any).msSaveBlob;

  });
});
