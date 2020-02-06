import axios from 'axios';
import cheerio from 'cheerio';

const coursesCrawler = () => {
  axios.get('https://w5.ab.ust.hk/wcq/cgi-bin/1930/subject/COMP').then((res) => {
    const $ = cheerio.load(res.data);
    const courseList: any[] = [];
    $('div .course').each((_i: any, e: any) => {
      const [code, name] = $(e).find('h2').text().split(' - ');
      const sectionList: any[] = [];
      const instructorList: any[] = [];
      $(e).find('td').each((_i1: any, e1: any) => {
        const dummy = $(e1).text();
        if (dummy.match(/([A-Z]+[0-9])\s\(([0-9]+[0-9])\)/g)) {
          sectionList.push(dummy.substr(0, dummy.indexOf(' ')));
        }
      });

      $(e).find('td a').each((_i2: any, e2: any) => {
        instructorList.push($(e2).text());
      });

      courseList.push({
        code: code.replace(' ', ''),
        name: name.substr(0, name.indexOf('(') - 1),
        sections: sectionList,
        instructors: instructorList,
      });
    });

    return courseList;
  });
};

export default coursesCrawler;
